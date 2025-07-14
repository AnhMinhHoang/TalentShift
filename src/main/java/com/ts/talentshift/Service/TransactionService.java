package com.ts.talentshift.Service;

import com.ts.talentshift.Model.Transaction;
import com.ts.talentshift.Repository.TransactionRepository;
import com.ts.talentshift.Repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {
    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;

public TransactionService(TransactionRepository transactionRepository, UserRepository userRepository) {
        this.transactionRepository = transactionRepository;
        this.userRepository = userRepository;
    }

    public void createTransaction(Transaction transaction) {
        transactionRepository.save(transaction);
    }

    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    public List<Transaction> getAllTransactionsByUserId(Long userId) {
        return userRepository.findById(userId)
                .map(transactionRepository::findByUser)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
    }
}
