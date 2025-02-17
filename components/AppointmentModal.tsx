"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "./ui/button";
import clsx from "clsx";
import ServiceForm from "./forms/ServiceForm";
import { Service } from "@/types/appwrite.types";

interface AppointmentModalProps {
  type: "approve" | "cancel";
  serviceId: string;
  userId: string;
  service: Service;
}
function AppointmentModal({ type, service, userId }: AppointmentModalProps) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={clsx("capitalize", {
            "text-green-500": type === "approve",
          })}
        >
          {type}
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog sm:max-w-md">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle className="capitalize">{type} Service</DialogTitle>
          <DialogDescription>
            Please fill in the following details to {type} the service requested
          </DialogDescription>
        </DialogHeader>
        <ServiceForm
          type={type}
          service={service}
          userId={userId}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
}

export default AppointmentModal;
