import * as Styles from "@ui/Messages/Message/DateSeparator/elements";

function DateSeparator({dateString}: {dateString: string}) {
  return (
    <Styles.Base>
      <Styles.Date>
        {dateString}
      </Styles.Date>
    </Styles.Base>
  );
}

export default DateSeparator;
