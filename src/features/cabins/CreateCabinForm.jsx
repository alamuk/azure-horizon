import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";

import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow.jsx";
import { useCreateCabin } from "./useCreateCabin.js";
import { useEditCabin } from "./useEditCabin.js";

// eslint-disable-next-line react/prop-types
function CreateCabinForm({ cabinToEdit = {} }) {
    const { id: editId, ...editValues } = cabinToEdit;
    const isEditSession = Boolean(editId);

    const { register, handleSubmit, reset, getValues, formState } = useForm({
        defaultValues: isEditSession ? editValues : {},
    });

    const { errors } = formState;

    // custom hook
    const { isCreating, createCabin } = useCreateCabin();
    const { isEditing, editCabin } = useEditCabin();

    const isWorking = isCreating || isEditing;

    const onSubmitHandler = (data) => {
        const image =
            typeof data.image === "string" ? data.image : data.image[0];

        if (isEditSession)
            editCabin(
                {
                    newCabinData: {
                        ...data,
                        image,
                    },
                    editId,
                },
                {
                    onSuccess: (data) => {
                        reset(data);
                    },
                }
            );
        else
            createCabin(
                { ...data, image: data.image[0] },
                {
                    onSuccess: (data) => {
                        reset(data);
                    },
                }
            );
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
                    disabled={isWorking}
                    {...register("name", {
                        required: "this field is required",
                    })}
                />
            </FormRow>

            <FormRow label="Max capacity" error={errors?.maxCapacity?.message}>
                <Input
                    type="number"
                    id="maxCapacity"
                    disabled={isWorking}
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
                    disabled={isWorking}
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
                    disabled={isWorking}
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
                    disabled={isWorking}
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
                        required: isEditSession
                            ? false
                            : "this field is required",
                    })}
                />
            </FormRow>

            <FormRow>
                {/* reset type is an HTML attribute! */}
                <Button variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button disabled={isWorking}>
                    {isEditSession ? "Update Cabin" : "Create New Cabin"}
                </Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
