package com.ts.talentshift.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ts.talentshift.Enums.PaymentMethod;
import com.ts.talentshift.Enums.TransactionStatus;
import com.ts.talentshift.Model.MoMoResponse;
import com.ts.talentshift.Model.Transaction;
import com.ts.talentshift.Model.User;
import com.ts.talentshift.Repository.TransactionRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
public class MoMoService {
    @Value("${momo.partner-code}")
    private String partnerCode;

    @Value("${momo.access-key}")
    private String accessKey;

    @Value("${momo.secret-key}")
    private String secretKey;

    @Value("${momo.api-endpoint}")
    private String apiEndpoint;

    @Value("${momo.return-url}")
    private String returnUrl;

    @Value("${momo.notify-url}")
    private String notifyUrl;

    private final TransactionRepository transactionRepository;
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public MoMoService(TransactionRepository transactionRepository, RestTemplate restTemplate, ObjectMapper objectMapper) {
        this.transactionRepository = transactionRepository;
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
    }

    public Map<String, Object> createPayment(BigDecimal amount, User user, String orderInfo) {
        try{
            String orderId = "ORDER_" + System.currentTimeMillis();
            String requestId = UUID.randomUUID().toString();
            String extraData = "";
            String requestType = "captureWallet";

            //Create transaction record
            Transaction transaction = new Transaction(requestId, orderId, amount, user, orderInfo );
            transaction.setStatus(TransactionStatus.PENDING);
            transaction.setPaymentMethod(PaymentMethod.MOMO);
            transaction = transactionRepository.save(transaction);

            //Build signature
            String rawSignature = "accessKey=" + accessKey +
                    "&amount=" + amount.longValue() +
                    "&extraData=" + extraData +
                    "&ipnUrl=" + notifyUrl +
                    "&orderId=" + orderId +
                    "&orderInfo=" + orderInfo +
                    "&partnerCode=" + partnerCode +
                    "&redirectUrl=" + returnUrl +
                    "&requestId=" + requestId +
                    "&requestType=" + requestType;

            String signature = hmacSHA256(rawSignature, secretKey);

            //Build request body
            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("partnerCode", partnerCode);
            requestBody.put("partnerName", "Talentshift");
            requestBody.put("storeId", "TS_STORE");
            requestBody.put("requestId", requestId);
            requestBody.put("amount", amount.longValue());
            requestBody.put("orderId", orderId);
            requestBody.put("orderInfo", orderInfo);
            requestBody.put("redirectUrl", returnUrl);
            requestBody.put("ipnUrl", notifyUrl);
            requestBody.put("lang", "vi");
            requestBody.put("extraData", extraData);
            requestBody.put("requestType", requestType);
            requestBody.put("signature", signature);

            //Set Header
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);

            //request to MoMo API
            ResponseEntity<MoMoResponse> response = restTemplate.postForEntity(apiEndpoint, requestEntity, MoMoResponse.class);
            MoMoResponse responseBody = response.getBody();

            if(responseBody != null) {
                //Update transaction with response details
                transaction.setResultCode(responseBody.getResultCode());
                transaction.setMessage(responseBody.getMessage());
                transaction.setPayUrl(responseBody.getPayUrl());
                transaction.setResponseTime(responseBody.getResponseTime());
                transactionRepository.save(transaction);

                Map<String, Object> result = new HashMap<>();
                result.put("success", true);
                result.put("payUrl", responseBody.getPayUrl());
                result.put("transactionId", requestId);
                result.put("orderId", orderId);
                result.put("orderInfo", orderInfo);

                return result;
            }
        } catch (Exception e){
            log.error("Error creating payment: {}", e.getMessage());
        }
        Map<String, Object> error = new HashMap<>();
        error.put("success", false);
        error.put("message", "Failed to create payment");
        return error;
    }

    public Transaction handleCallback(Map<String, Object> callbackData){
        String orderId = String.valueOf(callbackData.get("orderId"));
        String resultCode = String.valueOf(callbackData.get("resultCode"));
        String message = String.valueOf(callbackData.get("message"));
        String responseTime = String.valueOf(callbackData.get("responseTime"));
        String payType = String.valueOf(callbackData.get("payType"));

        Optional<Transaction> transactionOpt = getTransactionByOrderId(orderId);
        if (transactionOpt.isPresent()) {
            Transaction transaction = transactionOpt.get();
            transaction.setResultCode(Integer.parseInt(resultCode));
            transaction.setMessage(message);
            transaction.setResponseTime(responseTime);
            transaction.setBankCode("MOMO");
            transaction.setPayType(payType);

            if ("0".equals(resultCode) || "1006".equals(resultCode)) {
                transaction.setStatus(TransactionStatus.SUCCESS);
            } else {
                transaction.setStatus(TransactionStatus.FAILED);
            }

            return transactionRepository.save(transaction);
        }
        return null;
    }

    public Optional<Transaction> getTransactionByOrderId(String orderId) {
        return transactionRepository.findByOrderId(orderId);
    }

    public Transaction getTransactionByTransactionId(String transactionId) {
        return transactionRepository.findByTransactionId(transactionId);
    }

    private String hmacSHA256(String data, String key) throws NoSuchAlgorithmException, InvalidKeyException {
        Mac sha256_HMAC = Mac.getInstance("HmacSHA256");
        SecretKeySpec secret_key = new SecretKeySpec(key.getBytes(StandardCharsets.UTF_8),"HmacSHA256");
        sha256_HMAC.init(secret_key);
        byte[] hash = sha256_HMAC.doFinal(data.getBytes(StandardCharsets.UTF_8));

        StringBuilder hexString = new StringBuilder();
        for (byte b : hash) {
            String hex = Integer.toHexString(0xff & b);
            if(hex.length() == 1) hexString.append('0');
            hexString.append(hex);
        }
        return hexString.toString();
    }
}
