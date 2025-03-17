"use client";
import Link from "next/link";
const Header = () => {
    return (
        <header className="bg-[#E5ADA8] text-[#dd8e80] p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-[#745437] shadow-2xl shadow-[#b97a76]/50 font-cursive">
                FoodieRecetas🍩
            </h1>
            <div>
                <Link href="/login">
                    <button className="bg-[#ffffff] text-[#dd8e80] font-bold py-2 px-4 rounded-full border-2 border-[#dd8e80] 
          hover:bg-[#dd8e80] hover:text-white hover:border-[#dd8e80] transition-all duration-300">
                        Login
                    </button>
                </Link>
                <Link href="/register">
                    <button className="bg-[#ffffff] text-[#dd8e80] font-bold py-2 px-4 rounded-full border-2 border-[#dd8e80] 
          hover:bg-[#dd8e80] hover:text-white hover:border-[#dd8e80] transition-all duration-300">
                        Register
                    </button>
                </Link>
            </div>
        </header>
    );
};

export default Header;
