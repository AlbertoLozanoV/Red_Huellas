
package com.redHuellas.red_huellas_api.repository;

import com.redHuellas.red_huellas_api.entity.Animal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnimalRepository extends JpaRepository<Animal, Integer> {
}
