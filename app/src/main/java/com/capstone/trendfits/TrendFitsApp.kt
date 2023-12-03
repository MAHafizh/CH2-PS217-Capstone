package com.capstone.trendfits

import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AddCircle
import androidx.compose.material.icons.filled.Favorite
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Settings
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.navigation.NavGraph.Companion.findStartDestination
import androidx.navigation.NavHostController
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument
import com.capstone.trendfits.ui.detail.DetailClothes
import com.capstone.trendfits.ui.favorite.FavotiteScreen
import com.capstone.trendfits.ui.home.HomeScreen
import com.capstone.trendfits.ui.navigation.NavigationItem
import com.capstone.trendfits.ui.navigation.Screen
import com.capstone.trendfits.ui.scan.Scan
import com.capstone.trendfits.ui.setting.SettingScreen


@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun TrendFitsApp(
    modifier: Modifier = Modifier,
    navController: NavHostController = rememberNavController(),
) {
    val navBackStackEntry by navController.currentBackStackEntryAsState()
    val currentRoute = navBackStackEntry?.destination?.route

    Scaffold(
        bottomBar = {
            if (currentRoute != Screen.DetailClothes.route) {
                BottomBar(navController)
            }
        },
        modifier = modifier
    ) { innerPadding ->
        NavHost(
            navController = navController,
            startDestination = Screen.Home.route,
            modifier = Modifier.padding(innerPadding)
        ) {
            composable(Screen.Home.route) {
                HomeScreen(
                    navigateToDetail = { rewardId ->
                        navController.navigate(Screen.DetailClothes.createRoute(rewardId))
                    }
                )
            }
            composable(Screen.Scan.route) {
                Scan()
            }
            composable(Screen.Favorite.route) {
                FavotiteScreen()
            }
            composable(Screen.Setting.route) {
                SettingScreen()
            }
            composable(
                route = Screen.DetailClothes.route,
                arguments = listOf(navArgument("clothesId") { type = NavType.LongType }),
            ) {
                val id = it.arguments?.getLong("clothesId") ?: -1L
                DetailClothes(
                    clothesId = id,
                    navigateBack = {
                        navController.navigateUp()
                    },
                )
            }
        }
    }

}




@Composable
fun BottomBar(
    navController: NavHostController,
    modifier: Modifier = Modifier
) {
    NavigationBar(
        modifier = modifier
    ) {
        val navBackStackEntry by navController.currentBackStackEntryAsState()
        val currentRoute = navBackStackEntry?.destination?.route
        val navigationItems = listOf(
            NavigationItem(
                title = stringResource(R.string.menu_home),
                icon = Icons.Default.Home,
                screen = Screen.Home
            ),
            NavigationItem(
                title = stringResource(R.string.scan),
                icon = Icons.Default.AddCircle,
                screen = Screen.Scan
            ),
            NavigationItem(
                title = stringResource(R.string.Favorite),
                icon = Icons.Default.Favorite,
                screen = Screen.Favorite
            ),
            NavigationItem(
                title = stringResource(R.string.setting),
                icon = Icons.Default.Settings,
                screen = Screen.Setting
            ),
        )
        navigationItems.map { item ->
            NavigationBarItem(
                icon = {
                    Icon(
                        imageVector = item.icon,
                        contentDescription = item.title
                    )
                },
                label = { Text(item.title) },
                selected = currentRoute == item.screen.route,
                onClick = {
                    navController.navigate(item.screen.route) {
                        popUpTo(navController.graph.findStartDestination().id) {
                            saveState = true
                        }
                        restoreState = true
                        launchSingleTop = true
                    }
                }
            )
        }
    }
}