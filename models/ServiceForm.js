import mongoose from "mongoose";

const ServiceFormSchema = new mongoose.Schema(
  {
    serviceSlug: { type: String, required: true },
    serviceName: { type: String, required: true }, // NEW FIELD
    user: {
      name: { type: String, required: true },
      email: { type: String, required: true },
    },
    formValues: { type: Object, required: true },
  },
  { timestamps: true }
);

const ServiceForm = mongoose.models.ServiceForm || mongoose.model("ServiceForm", ServiceFormSchema);
export default ServiceForm;
