<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user() ? [
                'id' => $request->user()->id,
                'name' => $request->user()->name,
                'email' => $request->user()->email,
                'level' => $request->user()->level,
                'current_exp' => $request->user()->current_exp,
                'required_exp' => $request->user()->required_exp,
                'exp_percentage' =>$request->user()->exp_percentage,
                ] : null,
            ],
            'flash' => [
                'success' => $request->session()->get('success'),
                'exp_gained' => $request->session()->get('exp_gained'),
                'leveled_up' => $request->session()->get('leveled_up'),
                'new_level' => $request->session()->get('new_level'),
            ],
        ];
    }
}
