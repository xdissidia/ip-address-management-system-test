<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreIpAddressRequest;
use App\Http\Requests\UpdateIpAddressRequest;
use App\Models\IpAddress;

class IpAddressController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        return response([
            'data' => IpAddress::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreIpAddressRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreIpAddressRequest $request)
    {

        try {

            $ip_address = IpAddress::create($request->all(['ip_address', 'label']));
            $ip_address->trails()->create([
                'ip_address' => $request->getClientIp(),
                'action' => 'INSERT',
                'description' => collect($request->all(['ip_address', 'label']))->toJson(),
            ])->user()->associate($request->user())->save();
        } catch (\Throwable $th) {

            return response([
                'success' => false,
                'message' => $th->getMessage(),
            ]);
        }

        return response([
            'data' => $ip_address,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\IpAddress  $ipAddress
     * @return \Illuminate\Http\Response
     */
    public function show(IpAddress $ipAddress)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\IpAddress  $ipAddress
     * @return \Illuminate\Http\Response
     */
    public function edit(IpAddress $ipAddress)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateIpAddressRequest  $request
     * @param  \App\Models\IpAddress  $ipAddress
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateIpAddressRequest $request, IpAddress $ip_address)
    {

        try {

            $ip_address->update($request->all(['label']));
            $ip_address->trails()->create([
                'ip_address' => $request->getClientIp(),
                'action' => 'UPDATE',
                'description' => collect($request->all(['label']))->toJson(),
            ])->user()->associate($request->user())->save();
        } catch (\Throwable $th) {

            return response([
                'success' => false,
                'message' => $th->getMessage(),
            ]);
        }

        return response([
            'data' => $ip_address,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\IpAddress  $ipAddress
     * @return \Illuminate\Http\Response
     */
    public function destroy(IpAddress $ipAddress)
    {
        //
    }
}
