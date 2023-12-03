package com.capstone.trendfits.di

import com.capstone.trendfits.repo.Repository

object Injection {
    fun provideRepository(): Repository {
        return Repository.getInstance()
    }
}