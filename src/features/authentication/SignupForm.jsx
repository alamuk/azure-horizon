import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useForm } from "react-hook-form";
import useSignup from "./useSingup.js";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
    // why use the reactForm Hook -1. error handling, for validation
    const { register, formState, getValues, handleSubmit, reset } = useForm();
    const { errors } = formState;
    const { isLoading, signup } = useSignup();

    function onFormSubmit({ fullName, email, password }) {
        signup(
            { fullName, email, password },
            {
                onSettled: () => reset(),
            }
        );
    }

    return (
        <Form onSubmit={handleSubmit(onFormSubmit)}>
            <FormRow label="Full name" error={errors?.fullName?.message}>
                <Input
                    type="text"
                    id="fullName"
                    disabled={isLoading}
                    {...register("fullName", { required: "this is required" })}
                />
            </FormRow>

            <FormRow label="Email address" error={errors?.email?.message}>
                <Input
                    type="email"
                    id="email"
                    disabled={isLoading}
                    {...register("email", {
                        required: "this is required",
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "provide a valid email address",
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label="Password (min 8 characters)"
                error={errors?.password?.message}
            >
                <Input
                    type="password"
                    id="password"
                    disabled={isLoading}
                    {...register("password", {
                        required: "this is required",
                        minLength: {
                            value: 8,
                            message: " password need to be minimum 8 characters ",
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label="Repeat password"
                error={errors?.passwordConfirm?.message}
            >
                <Input
                    type="password"
                    id="passwordConfirm"
                    disabled={isLoading}
                    {...register("passwordConfirm", {
                        required: "this is required",
                        validate: (value) =>
                            value === getValues().password ||
                            "passwords need to match",
                    })}
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button
                    variation="secondary"
                    type="reset"
                    disabled={isLoading}
                    onClick={reset}
                >
                    Cancel
                </Button>
                <Button disabled={isLoading}>Create new user</Button>
            </FormRow>
        </Form>
    );
}

export default SignupForm;
