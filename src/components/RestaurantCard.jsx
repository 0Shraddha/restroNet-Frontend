import React from "react";
import { 
    Card,
    CardContent,
    CardFooter,
    CardHeader,
 } from '../components/ui/card'
import { Button } from "./ui/button";
 import { Shapes, ArrowRight } from "lucide-react";

const RestaurantCard = () => {
    return (
        <Card className="col-span-3 shadow-none gap-0 pt-0">
            <CardHeader className="py-4 px-5 flex flex-row items-center gap-3 font-semibold">
                <div className="h-8 w-8 flex items-center justify-center bg-primary text-primary-foreground rounded-full">
                <Shapes className="h-5 w-5" />
                </div>
                Cafe WindowPane
            </CardHeader>
            <CardContent className="mt-1 text-[15px] text-muted-foreground px-5">
                <p>
                Explore a collection of Shadcn UI blocks and components, ready to
                preview and copy.
                </p>
                <img className="mt-5 w-full h-50 object-cover bg-muted rounded-xl" src="../../src/assets/restro.png" />

            </CardContent>
            <CardFooter className="mt-6">
                <Button className="btn btn-primary">
                View more <ArrowRight />
                </Button>
            </CardFooter>
        </Card>
    )
}

export default RestaurantCard;