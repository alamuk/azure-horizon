import supabase from "./supabase.js";

export async function getGuests() {
    let { data, error } = await supabase.from("guests").select("*");

    if (error) {
        console.log(error);
        throw new Error("this Guest error happened");
    }

    return data;
}
