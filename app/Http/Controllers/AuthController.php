<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\User;
use App\Product;
use App\Cart;

class AuthController extends Controller
{

    public function users(Request $request){
        
        $users = User::all();
        
        return response()->json($users);

    }

    public function register(Request $request, User $user){
        $user->email = $request->email;
        $user->password = $request->password;
        $user->nickname = $request->nickname;
        $user->type = '2';
        $user->save();
        return response()->json($user);
    }

    public function products(){

        $products = Product::all();
        return response()->json($products);

    }

    public function add(Request $request, Product $products){
        $products->name = $request->name;
        $products->price = $request->price;
        $products->tags = $request->tags;
        $products->image = $request->image;
        $products->status = $request->status;
        $products->save();
        return response()->json($products);
    }

    public function update(Request $request){
        $productsId = $request->get('id');
        $productsName = $request->get('name');
        $productsPrice = $request->get('price');
        $productsTags = $request->get('tags');
        $productsImage = $request->get('image');
        $productsStatus = $request->get('status');

        Product::where('id', $productsId)->update([
            'id' => $productsId,
            'name' => $productsName,
            'price' => $productsPrice,
            'tags' => $productsTags,
            'image' => $productsImage,
            'status'=> $productsStatus,
        ]);

        return response()->json([
            'id' => $productsId,
            'name' => $productsName,
            'price' => $productsPrice,
            'tags' => $productsTags,
            'image' => $productsImage,
            'status'=> $productsStatus,
        ]);


    }

    

    public function delete($id){

        Product::destroy($id);
        // DB::table('products')->where('id',$id)->delete();

        
        return view('welcome');

    }
    public function deleteCarts($id){

        Cart::destroy($id);
        // DB::table('products')->where('id',$id)->delete();

        
        return response()->json('success');

    }

    public function carts(){

        $carts = Cart::all();
        return response()->json($carts);

    }

    public function getCart($id){

        $carts = Cart::where('productId', $id)->get();
        
        // $carts = DB::table('carts')->where('id',$id)->get();
        
        return response()->json($carts);

    }
    public function putCarts(Request $request){

        $mount = $request->mount;
        $id = $request->id;
        $image = $request->image;
        $name = $request->name;
        $price = $request->price;
        $productId = $request->productId;
        Cart::where('id', $id)->update([
            'id' => $id,
            'mount' => $mount,
            'image' => $image,
            'name' => $name,
            'price' => $price,
            'productId' => $productId
        ]);

        return response()->json([
            'id' => $id,
            'mount' => $mount,
            'image' => $image,
            'name' => $name,
            'price' => $price,
            'productId' => $productId
        ]);

        // $productsMount = $request->get('mount');
        // Product::where('id', $id)->update([
        //     'mount' => $productsMount
        // ]);
        
        // return response()->json([
        //     'mount' => $productsMount
        // ]);

        

    }
    public function postCarts(Request $request, Cart $carts){

        $carts->name = $request->name;
        $carts->image = $request->image;
        $carts->productId = $request->productId;
        $carts->price = $request->price;
        $carts->mount = $request->mount;
        $carts->save();
        return response()->json($carts);

    }
}
