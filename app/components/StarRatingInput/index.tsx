type Props = {
  value?: string;
};

const isChecked = (value: Props['value'], match: string) => {
  if (value === undefined) return false;
  return value === match;
};

export const StarRatingInput = ({ value }: Props) => {
  return (
    <fieldset className="flex flex-col gap-1">
      <legend>Rating</legend>
      <div className="flex gap-4">
        <div className="flex flex-col items-center">
          <label htmlFor="rating-1">1</label>
          <input
            type="radio"
            name="rating"
            id="rating-1"
            value="1"
            defaultChecked={isChecked(value, '1')}
            required
          />
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="rating-2">2</label>
          <input
            type="radio"
            name="rating"
            id="rating-2"
            value="2"
            defaultChecked={isChecked(value, '2')}
            required
          />
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="rating-3">3</label>
          <input
            type="radio"
            name="rating"
            id="rating-3"
            value="3"
            defaultChecked={isChecked(value, '3')}
            required
          />
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="rating-4">4</label>
          <input
            type="radio"
            name="rating"
            id="rating-4"
            value="4"
            defaultChecked={isChecked(value, '4')}
            required
          />
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="rating-5">5</label>
          <input
            type="radio"
            name="rating"
            id="rating-5"
            value="5"
            defaultChecked={isChecked(value, '5')}
            required
          />
        </div>
      </div>
    </fieldset>
  );
};
