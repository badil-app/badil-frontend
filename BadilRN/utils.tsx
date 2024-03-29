import { View, Image, Platform, Alert } from "react-native";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import StarRating from "react-native-star-rating-widget";
import { useState } from "react";
import {
    request,
    PERMISSIONS,
    openSettings,
    RESULTS,
} from "react-native-permissions";

export function InteractiveStarRow({
    providedRating,
}: {
    providedRating: number;
}) {
    const [rating, setRating] = useState(providedRating);
    return <StarRating rating={rating} onChange={setRating} />;
}

export function StaticStarRow({ providedRating }: { providedRating: number }) {
    return <StarRatingDisplay rating={providedRating} />;
}
