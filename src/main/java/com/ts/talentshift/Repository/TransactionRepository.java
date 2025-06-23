package com.ts.talentshift.Repository;

import com.ts.talentshift.Enums.TransactionStatus;
import com.ts.talentshift.Model.Transaction;
import com.ts.talentshift.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    Transaction findByOrderId(String orderId);
    Transaction findByTransactionId(String transactionId);
    List<Transaction> findByUser_UserIdOrderByCreatedTimeDesc(Long userId);
    List<Transaction> findByStatusOrderByCreatedTimeDesc(TransactionStatus status);
}
