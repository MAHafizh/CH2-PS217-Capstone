package com.capstone.trendfits.ui.navigation

sealed class Screen(val route: String) {
    object Home : Screen("home")
    object Scan : Screen("scan")
    object Favorite : Screen("favorite")
    object Setting : Screen("setting")
    object DetailClothes : Screen("home/{clothesId}") {
        fun createRoute(clothesId: Long) = "home/$clothesId"
    }
}