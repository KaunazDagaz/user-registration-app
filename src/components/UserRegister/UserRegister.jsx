import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { createUser, getPositions } from "../../api/api";
import { NAME_VALIDATION, EMAIL_VALIDATION, PHONE_VALIDATION, validateImage, getDefaultProfileImage } from "./userRegisterUtils";
import RadioButton from "../utils/RadioButton";
import Loader from "../utils/Loader";
import Button from "../utils/Button";
import ImageUpload from "../utils/ImageUpload";
import TextInput from "../utils/TextInput";
import SuccessIcon from "../../assets/success-image.svg";
import { useState } from "react";

export default function UserRegister() {
  const queryClient = useQueryClient();
  const [apiError, setApiError] = useState(null);

  const { data: positions, isLoading: isPositionsLoading } = useQuery({
    queryKey: ["positions"],
    queryFn: getPositions
  });

  const submitSignUp = useMutation({
    mutationFn: async (formData) => {
      setApiError(null);
      
      let photo = formData.photo;
      if (!photo) {
        photo = await getDefaultProfileImage();
      }

      await createUser({
        ...formData,
        photo: photo,
      });

      queryClient.setQueryData(["users"], (oldData) => {
        return oldData 
          ? {
            pageParams: [1],
            pages: [{
              ...oldData.pages[0],
              users: [
                {
                  ...formData,
                  photo: URL.createObjectURL(photo),
                  position: positions?.find(position => position.id.toString() === formData.position_id)?.name,
                  id: 0,
                },
                ...oldData.pages[0].users.slice(0, 5)
              ],
            }]
          } 
          : undefined
      });
    },
    onError: (error) => {
      setApiError(error.message || "An error occurred during registration. Please try again.");
    }
  });

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      position_id: "",
      photo: undefined,
    },
    onSubmit: ({ value }) => submitSignUp.mutate(value)
  });

  return (
    <section id="register" className="flex flex-col items-center">
      <h2 className="text-heading text-center mb-12.5">
        {
          submitSignUp.isSuccess 
            ? "User successfully registered" 
            : "Working with POST request"
        }
      </h2>
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className={`w-full max-w-[380px] ${submitSignUp.isSuccess ? 'hidden' : ''}`}
      >
        {apiError && (
          <div className="m-4 mt-1 text-center text-error-red">
            {apiError}
          </div>
        )}
        <form.Field
          name="name"
          validators={{
            onBlur: ({ value }) => {
              if (!value.match(NAME_VALIDATION)) {
                return "Name should have 2-60 characters";
              }
            }
          }}
        >
          {(field) => (
            <TextInput
              name={field.name}
              id={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              error={field.state.meta.errors[0]}
              placeholder="Your name"
              className="mb-12.5" 
            />
          )}
        </form.Field>
        <form.Field
          name="email"
          validators={{
            onBlur: ({ value }) => {
              if (!value.match(EMAIL_VALIDATION)) {
                return "Invalid email";
              }
            }
          }}
        >
          {(field) => (
            <TextInput
              name={field.name}
              id={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              error={field.state.meta.errors[0]}
              placeholder="Email" 
              className="mb-12.5" 
            />
          )}
        </form.Field>
        <form.Field
          name="phone"
          validators={{
            onBlur: ({ value }) => {
              if (!value.match(PHONE_VALIDATION)) {
                return "Invalid phone number";
              }
            }
          }}
        >
          {(field) => (
            <TextInput 
              name={field.name}
              id={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              error={field.state.meta.errors[0]}
              placeholder="Phone" 
              className="mb-4" 
              helperText="+380XXXXXXXXX"
            />
          )}
        </form.Field>
        <fieldset className="mb-[47px]">
          <legend className="mb-[11px]">
            Select your position
          </legend>
          <div className="flex flex-col gap-1.75">
            {isPositionsLoading ? (
              <Loader />
            ) : positions?.map((position) => (
              <form.Field
                key={position.id}
                name="position_id"
                validators={{
                  onBlur: ({ value }) => {
                    if (!value) {
                      return "Please select a position";
                    }
                  }
                }}
              >
                {(field) => (
                  <RadioButton 
                    name={field.name}
                    id={field.name}
                    value={position.id}
                    label={position.name}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                )}
              </form.Field>
            ))}
          </div>
          <form.Subscribe
            selector={(state) => state.fieldMeta.position_id?.errors[0]}
          >
            {(error) =>
              error ? (
                <span className="text-error-red text-helper mx-4 mt-1">{error}</span>
              ) : null
            }
          </form.Subscribe>
        </fieldset>
        <form.Field 
          name="photo"
          validators={{
            onChangeAsync: async ({ value }) => {
              return await validateImage(value);
            }
          }}
        >
          {(field) => (
            <ImageUpload 
              name={field.name}
              id={field.name}
              onChange={(file) => field.handleChange(file)}
              error={field.state.meta.errors[0]}
              placeholder="Upload your photo"
              wrapperClassName="mb-12.5"
            />
          )}
        </form.Field>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isDirty]}
        >
          {([canSubmit, isDirty]) => (
            <Button
              type="submit"
              disabled={!isDirty || !canSubmit || submitSignUp.isPending}
              className="mx-auto"
            >
              {submitSignUp.isPending ? "Submitting..." : "Sign up"}
            </Button>
          )}
        </form.Subscribe>
      </form>
      {submitSignUp.isSuccess && (
        <img 
          src={SuccessIcon} 
          alt="User create successfully"
          className="mx-auto"
          width={328}
          height={290}
        />
      )}
    </section>
  );
}