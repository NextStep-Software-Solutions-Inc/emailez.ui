import React from "react";

interface PricingCardProps {
    title: string;
    priceMonthly: number | null;
    priceYearly: number | null;
    discountMonthly: number;
    discountYearly: number;
    color: string;
    features: string[];
    buttonText: string;
    buttonColor: string;
    showYearly: boolean;
}

const getFinalPrice = (base: number | null, discount: number) => {
    if (!base) return base;
    return discount > 0 ? (base * (1 - discount / 100)).toFixed(base >= 100 ? 0 : 2) : base;
};

const PricingCard: React.FC<PricingCardProps> = ({
    title,
    priceMonthly,
    priceYearly,
    discountMonthly,
    discountYearly,
    color,
    features,
    buttonText,
    buttonColor,
    showYearly,
}) => {
    const isEnterprise = title === "Enterprise";
    const isYearly = showYearly;
    const discount = isYearly ? discountYearly : discountMonthly;
    const basePrice = isYearly ? priceYearly : priceMonthly;
    const finalPrice = getFinalPrice(basePrice, discount);
    const priceLabel = isYearly ? "/user/yr" : "/user/mo";

    return (
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8 flex flex-col items-center h-full">
            <h2 className={`text-2xl font-bold ${color} mb-2`}>{title}</h2>
            <div className="mb-2 w-full flex flex-wrap items-baseline gap-x-2 min-w-0 justify-center">
                {isEnterprise ? (
                    <>Custom</>
                ) : (
                    <>
                        <span className="text-3xl font-extrabold text-gray-900">${finalPrice}</span>
                        <span className="text-base font-normal">{priceLabel}</span>
                        {discount > 0 && (
                            <span className="font-semibold text-gray-500 break-words whitespace-normal">({discount}% off)</span>
                        )}
                    </>
                )}
            </div>
            <ul className="text-gray-600 mb-6 space-y-2 text-sm flex-grow">
                {features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                        <span className="mt-1 w-2 h-2 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex-shrink-0"></span>
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
            <div className="mt-auto w-full flex justify-center">
                <button className={`${buttonColor} text-white px-6 py-2 rounded-lg font-semibold transition hover:brightness-90 w-full`}>
                    {buttonText}
                </button>
            </div>
        </div>
    );
};

export default PricingCard;
