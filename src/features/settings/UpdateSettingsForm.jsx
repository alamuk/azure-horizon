import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSettings } from "./useSettings.js";
import Spinner from "../../ui/Spinner.jsx";
import { useUpdateSetting } from "./useUpdateSetting.js";

function UpdateSettingsForm() {
    const {
        isLoading,
        // eslint-disable-next-line no-unused-vars
        error,
        settingsData: {
            minBookingLength,
            maxBookingLength,
            maxGuestsPerBooking,
            breakfastPrice,
        } = {},
    } = useSettings();

    // eslint-disable-next-line no-unused-vars
    const { updateSetting, isUpdating } = useUpdateSetting();

    if (isLoading) return <Spinner />;

    function handleOnBlur(e, field) {
        const { value } = e.target;

        if (!value) return;
        updateSetting({ [field]: value });
    }

    return (
        <Form>
            <FormRow label="Minimum nights/booking">
                <Input
                    type="number"
                    id="min-nights"
                    defaultValue={minBookingLength}
                    disabled={isUpdating}
                    onBlur={(e) => handleOnBlur(e, "minBookingLength")}
                />
            </FormRow>

            <FormRow label="Maximum nights/booking">
                <Input
                    type="number"
                    id="max-nights"
                    defaultValue={maxBookingLength}
                    disabled={isUpdating}
                    onBlur={(e) => handleOnBlur(e, "maxBookingLength")}
                />
            </FormRow>

            <FormRow label="Maximum guests/booking">
                <Input
                    type="number"
                    id="max-guests"
                    defaultValue={maxGuestsPerBooking}
                    disabled={isUpdating}
                    onBlur={(e) => handleOnBlur(e, "maxGuestsPerBooking")}
                />
            </FormRow>

            <FormRow label="Breakfast price">
                <Input
                    type="number"
                    id="breakfast-price"
                    defaultValue={breakfastPrice}
                    disabled={isUpdating}
                    onBlur={(e) => handleOnBlur(e, "breakfastPrice")}
                />
            </FormRow>
        </Form>
    );
}

export default UpdateSettingsForm;
