import styles from './dashboard.module.css';

const Restaurant = ({ data }) => {

    return (<>

    <div className={styles.restaurantDiv}>
        <h2 className={styles.restaurantName}>{data.name}</h2>
        <p><em>{data.place}</em></p>
        <p><em>{data.cuisine}</em></p>
        <p>Rs. <em>{data.price}</em></p>
    </div>

    </>
    )

}

export default Restaurant;