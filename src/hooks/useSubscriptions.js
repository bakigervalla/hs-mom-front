import { client } from "../context/api";

const useSubscriptions = (showLoader) => {
  const getSubscriptions = async () => {
    showLoader(true);
    try {
      const { data } = await client.get("/subscriptions");
      return {
        success: true,
        subscriptions: data,
      };
    } catch (err) {
      return {
        success: false,
        error: {
          desc: err.response.data.error ?? "Unable to fetch subscriptions.",
        },
      };
    }
    finally {
        showLoader(false);
      }
  };

  const purchaseSubscription = async (plan) => {
    showLoader(true);
    try {
      const { data, status } = await client.post("/orders", plan);
      if (status !== 200)
        return {
          status: false,
          error: {
            desc: "Unable to purchase subscription.",
          },
        };

      return { status: false, data: data };
    } catch (err) {
      return {
        status: false,
        error: {
          desc: err.response.data.error ?? "Unable to purchase subscription.",
        },
      };
    }
    finally {
        showLoader(false);
      }
  };

  return { getSubscriptions, purchaseSubscription };
};

export default useSubscriptions;
