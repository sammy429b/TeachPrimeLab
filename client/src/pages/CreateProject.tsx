import React from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import ApiConfig from "../utils/ApiConfig";
import { SubmitHandler, useForm, FieldErrors, UseFormRegister } from "react-hook-form";

interface Project {
  projectTheme: string;
  reason: string;
  type: string;
  division: string;
  category: string;
  priority: string;
  department: string;
  startDate: string;
  endDate: string;
  location: string;
}

interface InputProps {
    label: string;
    register: UseFormRegister<Project>;
    name: keyof Project;
    errors: FieldErrors<Project>;
}

interface SelectProps {
    label: string;
    options: string[];
    register: UseFormRegister<Project>;
    name: keyof Project;
    errors: FieldErrors<Project>;
}

function CreateProject() {
    const { register, handleSubmit, formState: { errors }, reset, setError } = useForm<Project>();

  // Function to handle form submission
  const onSubmit: SubmitHandler<Project> = async (data: Project) => {
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);

    if (endDate <= startDate) {
      setError("endDate", {
        type: "manual",
        message: "End Date should be greater than Start Date",
      });
      return;
    }

    try {
      const response = await axios.post(
        ApiConfig.API_CREATE_PROJECT_URL,
        data,
        { withCredentials: true }
      );
      const responseData = await response.data;

      if (responseData.success) {
        alert("Project created successfully.");
        reset();
      } else {
        alert("All fields are required");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar header={"Create Project"} />
      <div className="flex justify-center">
        <div className="w-[90%] mx-auto bg-white py-4 px-8 h-screen rounded-lg fixed overflow-scroll top-16 md:top-32 scrollbar pb-64 md:pb-0">
          <form onSubmit={handleSubmit(onSubmit)} className="">
            <div className="w-full flex  justify-between items-start">
              <div className="w-full">
                <label className="form-control w-full" htmlFor="projectTheme">
                  <div className="label">
                    <span className="label-text"></span>
                    <span className="label-text-alt"></span>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter Project Theme"
                    {...register("projectTheme", {
                      required: "Project Theme is required",
                    })}
                    id="projectTheme"
                    className="input pb-8 h-20 input-bordered w-full  max-w-3xl text-[16px]"
                  />
                  <div className="label">
                    {errors.projectTheme && (
                      <span className="label-text-alt text-red-500">
                        {errors.projectTheme.message}
                      </span>
                    )}
                    <span className="label-text-alt"></span>
                  </div>
                </label>
              </div>
              <div className="hidden md:block">
                <button
                  type="submit"
                  className="w-40 bg-[#025AAB] text-base py-2 px-4 rounded-3xl text-white m-4 border-none"
                >
                  Save project
                </button>
              </div>
            </div>

            <div className="w-full flex flex-col pr-0 md:pr-24 ">
              <div className="w-full flex flex-col md:flex-row justify-start items-center gap-x-6">
                <Select
                  label={"Reason"}
                  options={["Business", "Dealership", "Transport"]}
                  register={register}
                  name="reason"
                  errors={errors}
                />
                <Select
                  label={"Type"}
                  options={["Internal", "External", "Vendor"]}
                  register={register}
                  name="type"
                  errors={errors}
                />
                <Select
                  label={"Division"}
                  options={[
                    "Compressor",
                    "Filters",
                    "Pumps",
                    "Glass",
                    "Water Heater",
                  ]}
                  register={register}
                  name="division"
                  errors={errors}
                />
              </div>
              <div className="flex flex-col md:flex-row justify-start items-center gap-x-6">
                <Select
                  label={"Category"}
                  options={["Quality A", "Quality B", "Quality C", "Quality D"]}
                  register={register}
                  name="category"
                  errors={errors}
                />
                <Select
                  label={"Priority"}
                  options={["Low", "Medium", "High"]}
                  register={register}
                  name="priority"
                  errors={errors}
                />
                <Select
                  label={"Department"}
                  options={[
                    "Strategy",
                    "Finance",
                    "Quality",
                    "Maintenance",
                    "Stores",
                  ]}
                  register={register}
                  name="department"
                  errors={errors}
                />
              </div>
              <div className="flex flex-col md:flex-row justify-start items-center gap-x-6">
                <Input
                  label={"Start Date as per Project Plan"}
                  register={register}
                  name="startDate"
                  errors={errors}
                />
                <Input
                  label={"End Date as per Project Plan"}
                  register={register}
                  name="endDate"
                  errors={errors}
                />
                <Select
                  label={"Location"}
                  options={["Pune", "Delhi", "Mumbai"]}
                  register={register}
                  name="location"
                  errors={errors}
                />
              </div>
              <div className="flex justify-around items-center">
                <p className="max-w-xl w-full"></p>
                <p className="max-w-xl w-full"></p>
                <p className="max-w-xl w-full">
                  <span className="text-gray-500 text-sm">Status :</span>{" "}
                  <span className="font-semibold">Registered</span>
                </p>
              </div>
            </div>
            <div className="md:hidden">
              <button
                type="submit"
                className="w-full bg-[#044E92] text-base py-2 px-4 rounded-3xl text-white my-8 border-none"
              >
                Save project
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateProject;


const Input: React.FC<InputProps> = ({ label, register, name, errors }) => {
  return (
    <label className="form-control w-full max-w-md">
      <div className="label">
        <span className="label-text text-green-500">{label}</span>
        <span className="label-text-alt"></span>
      </div>
      <input
        type="date"
        {...register(name, { required: `${label} is required` })}
        id={name}
        className="input input-bordered w-full max-w-md text-[16px]"
      />
      <div className="label">
        {errors[name] && (
          <span className="label-text-alt text-red-500">
            {errors[name]?.message}
          </span>
        )}
        <span className="label-text-alt"></span>
      </div>
    </label>
  );
};



const Select: React.FC<SelectProps> = ({
  label,
  options,
  register,
  name,
  errors,
}) => {
  return (
    <label className="form-control w-full max-w-md">
      <div className="label">
        <span className="label-text text-[16px] text-[#898989]">{label}</span>
        <span className="label-text-alt"></span>
      </div>
      <select
        {...register(name, { required: `${label} is required` })}
        id={name}
        className="select select-bordered text-[16px]"
      >
        {options.map((option: string, index: number) => (
          <option key={index} value={option} className="">
            {option}
          </option>
        ))}
      </select>
      <div className="label">
        {errors[name] && (
          <span className="label-text-alt text-red-500">
            {errors[name]?.message}
          </span>
        )}
        <span className="label-text-alt"></span>
      </div>
    </label>
  );
};
