"use client";

import React from "react";
import { careerPaths } from "@/data/career-paths";
import { Card, CardContent } from "@/components/ui/card";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { MobileFriendlyTooltip } from "./mobile-friendly-tooltip";

export default function CareerPathVisualizer() {
    return (
        <TooltipProvider>
            <div className="flex flex-col gap-10 py-12">
                {careerPaths.map((career, index) => (
                    <Card
                        key={index}
                        className="from-muted/40 to-background/70 backdrop-blur-sm border border-border shadow-lg rounded-3xl "
                    >
                        <CardContent className="p-8">
                            <h2 className="text-xl md:text-3xl font-extrabold text-foreground mb-8">
                                {career.track}
                            </h2>

                            <div className="flex items-center overflow-x-auto gap-12 relative pb-4 pr-24 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
                                {career.path.map((role, idx) => (
                                    <React.Fragment key={idx}>
                                        <div className="flex items-center min-w-max">
                                            <MobileFriendlyTooltip content={role.description}>
                                                <div className="flex flex-col items-center justify-center text-center px-6 py-5 bg-card/80 border border-border shadow-md rounded-2xl hover:scale-[1.05] hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer backdrop-blur-sm w-full">
                                                    <div className="text-4xl text-primary mb-2">{role.icon}</div>
                                                    <div className="text-base font-semibold text-foreground">{role.title}</div>
                                                    <div className="text-xs text-muted-foreground">{role.years} Years</div>
                                                </div>
                                            </MobileFriendlyTooltip>
                                        </div>

                                        {/* Show arrow *after* each role, except the last */}
                                        {idx !== career.path.length - 1 && (
                                            <div className="flex-shrink-0">
                                                <svg
                                                    width="40"
                                                    height="24"
                                                    viewBox="0 0 40 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="text-muted-foreground"
                                                >
                                                    <path
                                                        d="M0 12h36M30 6l6 6-6 6"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </div>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </TooltipProvider>
    );
}