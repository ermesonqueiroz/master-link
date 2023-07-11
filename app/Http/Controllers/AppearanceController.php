<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateAppearanceRequest;
use App\Http\Requests\UpdateAppeareanceRequest;
use App\Http\Resources\AppearanceResource;
use App\Models\Appearance;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;

class AppearanceController extends Controller
{
    public static function index(string $userId, Request $request)
    {
        $appearance = Appearance::where('userId', $userId)
            ->get()
            ->first();

        if (!$appearance) {
            return response([], 404);
        }

        $appearanceResource = new AppearanceResource($appearance);
        return $appearanceResource->toArray($request);
    }

    public static function update(UpdateAppearanceRequest $request)
    {
        $appearance = Appearance::where('userId', $request->userId)->update([
            'textColor' => $request->text_color,
            'backgroundColor' => $request->background_color,
            'buttonColor' => $request->button_color,
            'buttonTextColor' => $request->button_text_color,
        ]);

        if (!$appearance) {
            throw new HttpResponseException(
                response()->json([
                    'error' => 'user not found'
                ], 400)
            );
        }

        return response()->json([], 200);
    }
}
