import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { MetricsContext } from "../../context/dashboard/context";
import { AuthContext } from "../../context/auth/context";

export const Subscription = () => {
    const navigate = useNavigate();

    const { state, getSubscriptions, setSubscriptionId } = useContext(MetricsContext) || {};
    const { userData, refreshUserSubscriptions } = useContext(AuthContext);
    const { subscriptions, isOrderSuccessful } = state || {};
    const [current_sub_id] = useState(0);

    useEffect(() => {
        getSubscriptions();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (isOrderSuccessful) {
            userData.subscriptions.push({ subscription_id: current_sub_id });
            refreshUserSubscriptions(userData);
        }
        // eslint-disable-next-line
    }, [isOrderSuccessful]);

    const checkCurrentPlan = (subId) => {
        const plan = userData?.subscriptions?.filter(
            (x) => x.subscription_id === subId
        );
        return plan?.length > 0;
    };

    return (
        <div className="price-container mx-full antialiased text-gray-900">
            <main className="p-16 m-12 bg-white rounded-2xl">
                <div className="plan-header">
                    <div>
                        <h1 className="mb-4 text-2xl font-500 md:text-3xl lg:text-4xl">
                            Ready to start with HS Dashboard?
                        </h1>
                    </div>
                    <div className="flex pl-4">
                        <p className="flex items-center mr-4">
                            <input
                                id="inline-radio"
                                type="radio"
                                value=""
                                name="inline-radio-group"
                                className="w-4 h-4 mt-2 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label
                                htmlFor="inline-radio"
                                className="text-sm font-medium text-black"
                            >
                                Monthly
                            </label>
                        </p>

                        <p className="flex items-center mr-4">
                            <input
                                id="inline-2-radio"
                                type="radio"
                                value=""
                                defaultChecked
                                name="inline-radio-group"
                                className="w-4 h-4 mt-2 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label
                                htmlFor="inline-2-radio"
                                className="text-sm font-medium text-black"
                            >
                                Yearly (Save up to 20%)
                            </label>
                        </p>
                    </div>
                </div>

                <div className="plan-section flex flex-col lg:-mx-4 lg:flex-row lg:items-stretch lg:space-y-0 mt-16">
                    {subscriptions &&
                        subscriptions.map((plan, i) => {
                            return plan ? (
                                <div
                                    key={plan.id}
                                    className={
                                        "flex flex-col w-64 max-w-sm py-6 px-2 text-center border-2 border-gray-200 rounded-lg lg:mx-4 dark:bg-gray-800 dark:border-gray-700" +
                                        (plan.is_popular ? " bg-indigo-200" : "")
                                    }
                                >
                                    <div className="px-4 flex flex-col items-start text-start">
                                        <p className="font-500 text-3xl">
                                            {plan.name}
                                            {plan.is_popular ? (
                                                <span className="ml-2 text-[9px] border-2 border-inherit border-black font-600 px-2 py-0.5 rounded-full align-middle dark:bg-blue-200 dark:text-blue-800">
                                                    Popular
                                                </span>
                                            ) : (
                                                <></>
                                            )}
                                        </p>
                                        <p className="font-500 text-2xl pt-4">
                                            <span>${plan.price}</span>
                                            <span className="text-sm font-light text-gray-700 block">
                                                per month
                                            </span>
                                        </p>
                                        <button
                                            className={
                                                "mt-5 w-48 rounded py-4 px-4 bg-white text-sm border border-gray-300" +
                                                (!plan.is_active
                                                    ? " disabled"
                                                    : " text-gray-800 hover:bg-gray-200") +
                                                (plan.is_popular
                                                    ? " bg-blue-800 text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                                                    : " text-gray-800")
                                            }
                                            disabled={checkCurrentPlan(plan.id) ? "disabled" : null}
                                            onClick={async () => {
                                                setSubscriptionId(plan.id);
                                                navigate("/register");
                                            }}
                                        >
                                            {checkCurrentPlan(plan.id)
                                                ? "Current Plan"
                                                : plan.action_text}
                                        </button>
                                        <div className="mt-4 flex flex-col">
                                            <div className="grid grid-cols-5 mt-3 gap-y-2">
                                                {plan.offers?.split(",").map((itm, j) => {
                                                    return (
                                                        <React.Fragment key={j}>
                                                            <div className="pr-2">
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className="h-5 w-5"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke="#2563eb"
                                                                >
                                                                    <path d="M5 13l4 4L19 7" />
                                                                </svg>
                                                            </div>
                                                            <div className="col-span-4 text-sm font-light text-gray-700">
                                                                {itm}
                                                            </div>
                                                        </React.Fragment>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="h-0.5 my-6 bg-gray-200 w-full"></div>
                                    {plan.extra_offers?.split(",").map((itm, k) => {
                                        return (
                                            <React.Fragment key={k}>
                                                <span className="px-6 pb-1 text-sm font-light text-left text-gray-700"
                                                >
                                                    + {itm}
                                                </span>
                                            </React.Fragment>
                                        );
                                    })}
                                </div>
                            ) : null;
                        })}
                </div>
            </main>
        </div>
    );
};
