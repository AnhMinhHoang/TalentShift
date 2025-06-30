package com.ts.talentshift.Controller;

import com.ts.talentshift.Model.Transaction;
import com.ts.talentshift.Model.User;
import com.ts.talentshift.Repository.TransactionRepository;
import com.ts.talentshift.Service.UserService;
import com.ts.talentshift.Service.VNPayService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/api/vnpay")
public class VNPayController {
    private final VNPayService vnpayService;
    private final UserService userService;
    private final TransactionRepository transactionRepository;

    public VNPayController(VNPayService vnpayService, UserService userService, TransactionRepository transactionRepository) {
        this.vnpayService = vnpayService;
        this.userService = userService;
        this.transactionRepository = transactionRepository;
    }

    @PostMapping("/create")
    public ResponseEntity<Map<String, Object>> createPayment(@RequestBody Map<String, Object> request){
        try {
            BigDecimal amount = new BigDecimal(request.get("amount").toString());
            Long userId = Long.parseLong(request.get("userId").toString());
            String orderInfo = request.get("orderInfo").toString();

            //Fetch user details
            User user = userService.getUserById(userId);
            if (user == null) throw new Exception();

            Map<String, Object> result = vnpayService.createPayment(user, amount, orderInfo);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Map.of(
                            "success", false,
                            "message", "Invalid request data: " + e.getMessage()
                    ));
        }
    }

    @GetMapping("/return")
    public ResponseEntity<?> paymentReturn(@RequestParam Map<String, String> params) {
        try {
            // Extract params
            String orderId = params.get("vnp_TxnRef");
            String responseCode = params.get("vnp_ResponseCode");
            String paymentMethod = "vnpay";

            // Process transaction
            Transaction transaction = vnpayService.processPaymentReturn(params);

            if (transaction != null) {
                // Redirect to frontend result page with info
                String redirectUrl = "http://localhost:5173/transaction-result"
                        + "?orderId=" + orderId
                        + "&paymentMethod=" + paymentMethod
                        + "&responseCode=" + responseCode;

                return ResponseEntity.status(302)
                        .header("Location", redirectUrl)
                        .body("Redirecting...");
            } else {
                // Transaction not found
                Map<String, String> errorResponse = new HashMap<>();
                errorResponse.put("error", "Transaction not found");
                return ResponseEntity.badRequest().body(errorResponse);
            }
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to process payment return");
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }


    @GetMapping("/transaction/{orderId}")
    public ResponseEntity<?> getTransaction(@PathVariable String orderId) {
        Optional<Transaction> transaction = transactionRepository.findByOrderId(orderId);

        if (transaction.isPresent()) {
            return ResponseEntity.ok(transaction.get());
        } else {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Transaction not found");
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/user/{userId}/transactions")
    public ResponseEntity<List<Transaction>> getUserTransactions(@PathVariable Long userId) {
        List<Transaction> transactions = transactionRepository.findByUser_UserIdOrderByCreatedTimeDesc(userId);
        return ResponseEntity.ok(transactions);
    }
}
