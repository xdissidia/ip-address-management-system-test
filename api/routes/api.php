<?php

use App\Http\Controllers\api\v1\IpAddressController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::group(['prefix' => 'v1'], function () {
        Route::get('ip-addresses', [IpAddressController::class, 'index']);
        Route::post('ip-addresses', [IpAddressController::class, 'store']);
        Route::patch('ip-addresses/{ip_address}', [IpAddressController::class, 'update']);
    });
});
