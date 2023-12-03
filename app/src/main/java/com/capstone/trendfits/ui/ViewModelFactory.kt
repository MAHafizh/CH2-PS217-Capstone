package com.capstone.trendfits.ui

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import com.capstone.trendfits.repo.Repository
import com.capstone.trendfits.ui.detail.DetailClothesViewModel
import com.capstone.trendfits.ui.home.HomeScreenViewModel

class ViewModelFactory(private val repository: Repository) :
    ViewModelProvider.NewInstanceFactory() {

    @Suppress("UNCHECKED_CAST")
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(HomeScreenViewModel::class.java)) {
            return HomeScreenViewModel(repository) as T
        } else if (modelClass.isAssignableFrom(DetailClothesViewModel::class.java)) {
            return DetailClothesViewModel(repository) as T
        }
        throw IllegalArgumentException("Unknown ViewModel class: " + modelClass.name)
    }
}