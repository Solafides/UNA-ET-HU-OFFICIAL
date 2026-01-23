'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Upload, X, Loader2 } from 'lucide-react';
import Image from 'next/image';
import toast from 'react-hot-toast';

interface ImageUploadProps {
    value: string;
    onChange: (url: string) => void;
    disabled?: boolean;
    bucketName?: string;
}

export const ImageUpload = ({
    value,
    onChange,
    disabled,
    bucketName = 'uploads'
}: ImageUploadProps) => {
    const [isUploading, setIsUploading] = useState(false);

    const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
            return;
        }

        const file = e.target.files[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        try {
            setIsUploading(true);

            // Upload file to Supabase
            const { data, error: uploadError } = await supabase.storage
                .from(bucketName)
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from(bucketName)
                .getPublicUrl(filePath);

            onChange(publicUrl);
            toast.success('Image uploaded successfully');
        } catch (error: any) {
            console.error('Error uploading image:', error);
            toast.error('Failed to upload image', error.message);
        } finally {
            setIsUploading(false);
        }
    };

    const onRemove = () => {
        onChange('');
    };

    return (
        <div className="mb-4 flex flex-col gap-4">
            <div className="flex items-center gap-4">
                {value ? (
                    <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden border border-slate-200 dark:border-slate-800">
                        <div className="absolute top-2 right-2 z-10">
                            <Button
                                type="button"
                                onClick={onRemove}
                                variant="destructive"
                                size="icon"
                                className="h-8 w-8"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                        <Image
                            fill
                            className="object-cover"
                            alt="Image"
                            src={value}
                        />
                    </div>
                ) : (
                    <div className="w-[200px] h-[200px] rounded-md border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 text-slate-500">
                        <Upload className="h-10 w-10 mb-2" />
                        <span className="text-sm">No image selected</span>
                    </div>
                )}
            </div>
            <div>
                <div className="flex items-center gap-2">
                    <Button
                        type="button"
                        disabled={disabled || isUploading}
                        variant="secondary"
                        className="relative"
                    >
                        {isUploading ? (
                            <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Uploading...
                            </>
                        ) : (
                            <>
                                <Upload className="h-4 w-4 mr-2" />
                                Upload Image
                            </>
                        )}
                        <input
                            type="file"
                            disabled={disabled || isUploading}
                            accept="image/*"
                            onChange={onUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                        />
                    </Button>
                    <p className="text-xs text-muted-foreground">
                        Supported formats: JPG, PNG, GIF
                    </p>
                </div>
            </div>
        </div>
    );
};
