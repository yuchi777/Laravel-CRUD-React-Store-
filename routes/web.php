<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/login', function () {
    return view('welcome');
});

Route::get('/auth/login','AuthController@users');
Route::post('/auth/register','AuthController@register');

Route::get('/products','AuthController@products');
Route::post('/products','AuthController@add');
Route::put('/products/{id}','AuthController@update');
Route::delete('/products/{id}','AuthController@delete');

Route::get('/carts','AuthController@carts');
Route::get('/carts/{id}','AuthController@getCart');
Route::put('/carts','AuthController@putCarts');
Route::post('/carts','AuthController@postCarts');
Route::delete('/carts/{id}','AuthController@deleteCarts');