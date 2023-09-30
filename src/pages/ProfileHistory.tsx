import styles from "./Pages.module.css";
import { useSelector } from "react-redux";
import { Cards } from "./FeedPage";

export const ProfileHistory = () => {
  const profileOrders = useSelector((state: any) => {
    console.log(state, "стейт");

    return state.wsProfileReducer.orders;
  });
  console.log(profileOrders, "проф");
  return (
    profileOrders && (
      <div>
        <div className={styles.historybox}>
          <div className={styles.feedscroll + " custom-scroll"}>
            {profileOrders.map((card: any) => {
              return <Cards card={card} key={card._id} />;
            })}
          </div>
        </div>
      </div>
    )
  );
};
