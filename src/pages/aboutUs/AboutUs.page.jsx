import { Fragment } from "react";
import PageTitle from "../../components/pageTitle/PageTitle.component";

const AboutUs = () => {
  return (
    <Fragment>
      <PageTitle title="מה הקונספט" />
      <div className="my-3 m-auto p-3 w-md-50">
        <p>
          במשך שש שנים שבר רביב גבע את הראש במחשבות איך להרים את המיזם הקולינרי
          שלו - פלאפל בשר. גבע, קבלן בניין לשעבר מראשון לציון, היה נוהג במסגרת
          עבודתו לאכול לא מעט אוכל רחוב במהלך היום.
        </p>
        <p>
          אבל הכל התחיל כשיצא ערב אחד עם חברים לתל אביב. הוא היה בקטע של בשר אבל
          באזור שבו הם היו היה רק פלאפל. באמצע הביס עלתה במוחו השאלה - איך מנה
          כל כך ישראלית לא קיבלה שדרוג וקפצה קדימה עם בשר? מאותו רגע ועד שפתח את
          הדוכן שלו ברחוב לישנסקי באזור התעשייה החדש בראשון לציון, הוא לא נח.
        </p>
        <p>
          בסוף, אחרי לא מעט ניסיונות ("אכלתי אלפיים כדורי פלאפל") הוא הגיע
          לתוצאה שרצה: ערב אחד הוא ישב עם הבת שלו על הספה בסלון וראה אותה אוכלת
          שוקולד של פררו רושה. באותו רגע נפל לו האסימון והוא נכנס למטבח ויצא משם
          עם המוצר הסופי - כדור בשר שמצופה בכדור פלאפל. מנת הפלאפל בשר נמכרת
          ב-35 שקלים.
        </p>
        <p>
          "אין באדם שיושב ואוכל פה ולא אומר 'וואוו'. נגענו עם הרעיון הזה גם
          באוהבי פלאפל אדוקים וגם באוהבי בשר", מסביר גבע, "הקשר שלי לאוכל הוא
          אפסי, אני בקושי יודע להכין חביתה. אבל אני חובב אוכל ובכל רגע פנוי שהיה
          לי הייתי חוקר את הנושא וקורא מתכונים ברשת".
        </p>
        <p>
          <b>ואיך התגובות?</b>
          <br />
          "רוב האנשים שמחים על היצירתיות ועל השדרוג. יותר מכל דבר אחר בעולם
          הייתי רוצה שכולם יזכרו שאני הוא זה שהמצאתי את המנה הזאת".
        </p>
      </div>
    </Fragment>
  );
};
export default AboutUs;
