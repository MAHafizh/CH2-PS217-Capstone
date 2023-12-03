package com.capstone.trendfits.repo

import com.capstone.trendfits.model.ClothesOrder
import com.capstone.trendfits.model.DataSource
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flowOf

class Repository {

    private val clothesOrder = mutableListOf<ClothesOrder>()

    init {
        if (clothesOrder.isEmpty()) {
            DataSource.dummyOutfit.forEach {
                clothesOrder.add(ClothesOrder(it))
            }
        }
    }

    fun getClothes(): Flow<List<ClothesOrder>> {
        return flowOf(clothesOrder)
    }

    fun getClothesById(filmId: Long): ClothesOrder {
        return clothesOrder.first {
            it.clothes.id == filmId
        }
    }




    companion object {
        @Volatile
        private var instance: Repository? = null

        fun getInstance(): Repository =
            instance ?: synchronized(this) {
                Repository().apply {
                    instance = this
                }
            }
    }
}