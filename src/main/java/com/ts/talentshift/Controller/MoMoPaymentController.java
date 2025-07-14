package com.ts.talentshift.Controller;

import com.ts.talentshift.Model.Transaction;
import com.ts.talentshift.Model.User;
import com.ts.talentshift.Service.MoMoService;
import com.ts.talentshift.Service.UserService;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Map;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/api/momo")
public class MoMoPaymentController {
    private final MoMoService moMoService;
    private final UserService userService;

    @Value("${momo.frontend-url}")
    private String frontendUrl;

    public MoMoPaymentController(MoMoService moMoService, UserService userService) {
        this.moMoService = moMoService;
        this.userService = userService;
    }

    @PostMapping("/create")
    public ResponseEntity<Map<String, Object>> createPayment(@RequestBody Map<String, Object> request){
        try{
            BigDecimal amount = new BigDecimal(request.get("amount").toString());
            Long userId = Long.parseLong(request.get("userId").toString());
            String orderInfo = request.get("orderInfo").toString();

            //Fetch user details
            User user = userService.getUserById(userId);
            if (user == null) throw new Exception();

            Map<String, Object> result = moMoService.createPayment(amount, user, orderInfo);
            return ResponseEntity.ok(result);

        } catch (Exception e) {
            return ResponseEntity.badRequest()
            .body(Map.of(
            "success", false,
            "message", "Invalid request data"
            ));
        }
    }

    @PostMapping("/callback")
    public ResponseEntity<String> handleCallback(@RequestParam Map<String, String> params) {
        try {
            Transaction transaction = moMoService.handleCallback(params);
            return transaction != null
                    ? ResponseEntity.ok("OK")
                    : ResponseEntity.badRequest().body("Transaction not found or invalid");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error processing callback");
        }
    }

    @GetMapping("/return")
    public ResponseEntity<String> handleReturn(@RequestParam Map<String, String> params) {
        String orderId = params.get("orderId");
        String resultCode = params.get("resultCode");
        String paymentMethod = "momo";

        // Redirect to frontend with transaction info
        String redirectUrl = frontendUrl + "/transaction-result"
                + "?orderId=" + orderId
                + "&paymentMethod=" + paymentMethod
                + "&responseCode=" + resultCode;

        return ResponseEntity.status(302)
                .header("Location", redirectUrl)
                .body("Redirecting...");
    }

    @GetMapping("/transaction/{orderId}")
    public ResponseEntity<Transaction> getTransaction(@PathVariable String orderId) {
        Optional<Transaction> transactionOpt = moMoService.getTransactionByOrderId(orderId);
        Transaction transaction = transactionOpt.orElse(null);
        if (transaction != null) {
            return ResponseEntity.ok(transaction);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/transaction/by-id/{transactionId}")
    public ResponseEntity<Transaction> getTransactionById(@PathVariable String transactionId) {
        Transaction transaction = moMoService.getTransactionByTransactionId(transactionId);
        if (transaction != null) {
            return ResponseEntity.ok(transaction);
        }
        return ResponseEntity.notFound().build();
    }
}
