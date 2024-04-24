import supabase from "./supabase.js";
import { supabaseUrl } from "./supabase.js";

// --------------------------------
// connect with Supabase function
export async function getCabins() {
    const { data, error } = await supabase.from("cabins").select("*");

    if (error) {
        console.log(error);
        throw new Error("Cabins has problem to upload its data");
    }

    return data;
}

// ---------------------------------------
// create and upload new Cabin function

//Create new random folder so everytime it will show different name  //

export async function createEditCabin(newCabin, id) {
    console.log(newCabin, id);
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
        "/",
        ""
    );

    // how to create image path:///
    // https://nxjielvvmsyvbzmpwijw.supabase.co/storage/v1/object/public/cabin-images/cabin-002.jpg

    const imagePath = hasImagePath
        ? newCabin.image
        : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    // 1. create / edit new cabin
    let query = supabase.from("cabins");

    // A) CREATE AN NEW CABIN
    if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

    // B) EDIT CABIN
    if (id)
        query = query
            .update({ ...newCabin, image: imagePath })
            .eq("id", id)
            .select();

    const { data, error } = await query.select().single();

    if (error) {
        console.log(error);
        throw new Error("Cabins could not be created");
    }

    // 2.  Upload image

    if (hasImagePath) return data;
    const { error: storageError } = await supabase.storage
        .from("cabin-images")
        .upload(imageName, newCabin.image);

    // delete the cabin if there is an error to upload the image
    if (storageError) {
        await supabase.from("cabins").delete().eq("id", data.id);
        console.log(storageError);
        throw new Error("Cabins could not be uploaded and it has been deleted");
    }

    return data;
}

// --------------------------------
// 4. Delete cabin function
export async function deleteCabin(id) {
    const { data, error } = await supabase.from("cabins").delete().eq("id", id);

    if (error) {
        console.log(error);
        throw new Error("Cabins could not be deleted");
    }

    return data;
}
