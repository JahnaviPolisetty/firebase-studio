"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, MapPin, Search, LocateFixed } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';

const FormSchema = z.object({
  location: z.string().min(2, {
    message: 'Location must be at least 2 characters.',
  }),
  date: z.date({
    required_error: 'A date is required.',
  }),
});

type LocationFormProps = {
  onSearch: (location: string, date: Date) => void;
  isLoading: boolean;
};

const LocationForm = ({ onSearch, isLoading }: LocationFormProps) => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      location: '',
      date: new Date(),
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    onSearch(data.location, data.date);
  }

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const locationString = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
          form.setValue('location', locationString);
          onSearch(locationString, form.getValues('date'));
        },
        () => {
          toast({
            variant: "destructive",
            title: "Geolocation Error",
            description: "Could not retrieve your location. Please ensure location services are enabled.",
          });
        }
      );
    } else {
      toast({
        variant: "destructive",
        title: "Geolocation Not Supported",
        description: "Your browser does not support geolocation.",
      });
    }
  };


  return (
    <div className="rounded-lg bg-card/30 p-4 backdrop-blur-sm border border-white/20 shadow-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 md:flex-row md:items-start">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                  <FormControl>
                    <Input
                      placeholder="Enter a city or coordinates..."
                      className="pl-10 h-12 text-lg"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full md:w-[280px] h-12 justify-start text-left font-normal text-lg',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        <CalendarIcon className="mr-2 size-5" />
                        {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date('1900-01-01')}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="button"
            variant="outline"
            className="h-12 text-lg w-full md:w-auto"
            onClick={handleCurrentLocation}
            disabled={isLoading}
          >
            <LocateFixed className="mr-2 size-5" />
            Use Current Location
          </Button>
          <Button
            type="submit"
            className="h-12 text-lg w-full md:w-auto bg-primary hover:bg-primary/90"
            disabled={isLoading}
          >
            <Search className="mr-2 size-5" />
            {isLoading ? 'Searching...' : 'Search'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LocationForm;
