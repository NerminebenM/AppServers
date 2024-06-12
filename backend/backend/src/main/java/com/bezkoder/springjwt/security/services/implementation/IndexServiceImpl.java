package com.bezkoder.springjwt.security.services.implementation;

import com.bezkoder.springjwt.models.Index;
import com.bezkoder.springjwt.repository.IndexRepo;
import com.bezkoder.springjwt.security.services.IndexService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class IndexServiceImpl implements IndexService {
    private final IndexRepo indexRepo;

    @Override
    public List<Index> listIndices() {
        return indexRepo.findAll();
    }

    @Override
    public Index createIndex(Index index) {
        return indexRepo.save(index);
    }

    @Override
    public void closeIndex(Long id) {
        Optional<Index> indexOptional = indexRepo.findById(id);
        if (indexOptional.isPresent()) {
            Index index = indexOptional.get();
            index.setClosed(true);
            indexRepo.save(index);
        } else {
            throw new RuntimeException("Index not found with id " + id);
        };
    }

    @Override
    public void deleteIndex(Long id) {
        indexRepo.deleteById(id);
    }
}
