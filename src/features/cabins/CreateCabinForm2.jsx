import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { createCabin } from "../../services/apiCabins.js";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow.jsx";

function CreateCabinForm({ cabinToEdit }) {
    // eslint-disable-next-line no-unused-vars
    const { register, handleSubmit, reset, getValues, formState } = useForm();

    const { errors } = formState;

    const queryClient = useQueryClient();

    const { isLoading: isCreating, mutate } = useMutation({
        mutationFn: createCabin,
        onSuccess: () => {
            toast.success("New Cabin successfully created!");
            queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });
            reset();
        },
        onError: (err) => toast.error(err.message),
    });

    const onSubmitHandler = (data) => {
        mutate({ ...data, image: data.image[0] });
    };

    function onErrorHandler(errors) {
        console.log(errors);
    }

    return (
        <Form onSubmit={handleSubmit(onSubmitHandler, onErrorHandler)}>
            <FormRow label="Cabin name" error={errors?.name?.message}>
                <Input
                    type="text"
                    id="name"
                    disabled={isCreating}
                    {...register("name", {
                        required: "this field is required",
                    })}
                />
            </FormRow>

            <FormRow label="Max capacity" error={errors?.maxCapacity?.message}>
                <Input
                    type="number"
                    id="maxCapacity"
                    disabled={isCreating}
                    {...register("maxCapacity", {
                        required: "this field is required",
                        min: {
                            value: 1,
                            message: "minimum capacity will be 1",
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label="Regular Price"
                error={errors?.regularPrice?.message}
            >
                <Input
                    type="number"
                    id="regularPrice"
                    disabled={isCreating}
                    {...register("regularPrice", {
                        required: "this field is required",
                        min: {
                            value: 1,
                            message: "minimum capacity will be 1",
                        },
                    })}
                />
            </FormRow>
            <FormRow label="Discount" error={errors?.discount?.message}>
                <Input
                    type="number"
                    id="discount"
                    defaultValue={0}
                    disabled={isCreating}
                    {...register("discount", {
                        required: "this field is required",
                        validate: (currentValue) =>
                            currentValue <= getValues().regularPrice ||
                            "Discount price should be lower than regular price",
                    })}
                />
            </FormRow>
            <FormRow
                label="Description for Web"
                error={errors?.description?.message}
            >
                <Textarea
                    type="number"
                    id="description"
                    defaultValue=""
                    disabled={isCreating}
                    {...register("description", {
                        required: "this field is required",
                    })}
                />
            </FormRow>
            <FormRow label="Cabin Photo">
                <FileInput
                    id="image"
                    accept="image/*"
                    {...register("image", {
                        required: "this field is required",
                    })}
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button disabled={isCreating}>Add cabin</Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
