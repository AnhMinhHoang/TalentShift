package com.ts.talentshift.Controller;

import com.ts.talentshift.Model.Transaction;
import com.ts.talentshift.Model.User;
import com.ts.talentshift.Service.IUserService;
import com.ts.talentshift.Service.MoMoService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/momo")
public class MoMoPaymentController {
    private final MoMoService moMoService;
    private final IUserService userService;

    public MoMoPaymentController(MoMoService moMoService, IUserService userService) {
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
    public ResponseEntity<String> handleCallback(@RequestBody Map<String, Object> body) {
        try {
            Transaction transaction = moMoService.handleCallback(body);
            if (transaction != null) {
                return ResponseEntity.ok("OK");
            }
            return ResponseEntity.badRequest().body("Transaction not found or invalid");

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error processing callback");
        }
    }

    @GetMapping("/return")
    public ResponseEntity<String> handleReturn(@RequestParam Map<String, String> params) {
        String orderId = params.get("orderId");
        String resultCode = params.get("resultCode");

        // Redirect to frontend with transaction info
        String redirectUrl = "http://localhost:5173/transaction-result?orderId=" + orderId + "&resultCode=" + resultCode;

        return ResponseEntity.status(302)
                .header("Location", redirectUrl)
                .body("Redirecting...");
    }

    @GetMapping("/transaction/{orderId}")
    public ResponseEntity<Transaction> getTransaction(@PathVariable String orderId) {
        Transaction transaction = moMoService.getTransactionByOrderId(orderId);
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
