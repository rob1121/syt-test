import { object, number, string } from "yup";
import { Formik } from "formik";
import useYachtPosition from "@/lib/hooks/seYachtPosition";
import { Button } from "./ui/button";
import YachtPositionField from "./yacht-position-field";
import { DateTimePicker } from "./date-time-picker";
import { YachtPositionInput } from "@/types/yatch";

const schema = object().shape({
  yacht_like_id: number().required(),
  date_time: string().required(),
  lat: number().required(),
  lon: number().required(),
  notes: string().optional(),
});

export default function YachtPositionForm({
  yachtLikeId,
  onClose,
}: {
  yachtLikeId: number;
  onClose: () => void;
}) {
  const { addPositionMutation } = useYachtPosition({ yachtLikeId });
  const handleSubmit = (values: YachtPositionInput) => {
    addPositionMutation.mutate(values, {
        onSuccess: () => {
            onClose()
        }
    });
  };

  return (
    <Formik
      initialValues={{
        yacht_like_id: yachtLikeId,
        date_time: new Date(),
        lat: 0,
        lon: 0,
        notes: "",
      }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, handleChange, handleSubmit, setFieldValue }) => (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <DateTimePicker date={new Date(values.date_time)} onChange={(date) => setFieldValue("date_time", date)} />
          </div>
          <YachtPositionField position={{ lat: Number(values.lat), lng: Number(values.lon) }} onChange={(lat: number, lon: number) => {
            setFieldValue("lat", lat);
            setFieldValue("lon", lon);
          }} />
          <div>
            <label htmlFor="notes">Notes</label>
            <textarea
              name="notes"
              rows={4}
              value={values.notes}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-2 py-1 w-full"
            />
            {touched.notes && errors.notes && <div>{errors.notes}</div>}
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              className="bg-gray-500 text-white px-2 py-1 rounded-md"
              onClick={() => onClose()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-500 text-white px-2 py-1 rounded-md"
              disabled={addPositionMutation.isLoading}
            >
              Create
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
}
