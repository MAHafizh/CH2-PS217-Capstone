package com.capstone.trendfits.ui.detail

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.capstone.trendfits.model.ClothesOrder
import com.capstone.trendfits.repo.Repository
import com.capstone.trendfits.ui.components.StateUi
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

class DetailClothesViewModel(
    private val repository: Repository
) : ViewModel() {
    private val _stateUi: MutableStateFlow<StateUi<ClothesOrder>> =
        MutableStateFlow(StateUi.Loading)
    val uiState: StateFlow<StateUi<ClothesOrder>>
        get() = _stateUi

    fun getClothesById(clothesId: Long) {
        viewModelScope.launch {
            _stateUi.value = StateUi.Loading
            _stateUi.value =StateUi.Success(repository.getClothesById(clothesId))
        }
    }
}