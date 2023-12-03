package com.capstone.trendfits.ui.home

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.capstone.trendfits.model.ClothesOrder
import com.capstone.trendfits.repo.Repository
import com.capstone.trendfits.ui.components.StateUi
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.catch
import kotlinx.coroutines.launch

class HomeScreenViewModel(
    private val repository: Repository
) : ViewModel() {
    private val _stateUi: MutableStateFlow<StateUi<List<ClothesOrder>>> = MutableStateFlow(StateUi.Loading)
    val stateUi: StateFlow<StateUi<List<ClothesOrder>>>
        get() = _stateUi

    fun getAllClothes() {
        viewModelScope.launch {
            repository.getClothes()
                .catch {
                    _stateUi.value = StateUi.Error(it.message.toString())
                }
                .collect { filmOrder ->
                    _stateUi.value = StateUi.Success(filmOrder)
                }
        }
    }
}