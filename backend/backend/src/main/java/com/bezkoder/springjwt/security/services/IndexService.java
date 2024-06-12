package com.bezkoder.springjwt.security.services;

import com.bezkoder.springjwt.models.Index;
import java.util.List;

public interface IndexService {
    List<Index> listIndices();
    Index createIndex(Index index);
    void closeIndex(Long id);
    void deleteIndex(Long id);
}
