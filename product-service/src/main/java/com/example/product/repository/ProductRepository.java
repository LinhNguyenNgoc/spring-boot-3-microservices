package com.example.product.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.product.model.Product;

public interface ProductRepository extends MongoRepository<Product, String> {
}
