import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { apiUrl } from "@/constants/api";
import axiosInstance from "@/lib/axios-instance";
import FormInput from "@/components/app/form/form-input";
import PropTypes from "prop-types";
import FormTextArea from "@/components/app/form/form-textarea";
import FormImagePreview from "@/components/app/form/form-image-preview";
import FormImageResize from "@/components/app/form/form-image-resize";
import { getCategorys } from "@/contexts/reducer/product-category-slice";

const ProductCategoryUpdate = ({ items }) => {
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState(
    `${apiUrl}/uploads/category/${items.picture}`
  );

  const [formData, setFormData] = useState(() => {
    const form = new FormData();
    form.append("picture", items.picture);
    form.append("category_name", items.category_name);
    form.append("category_code", items.category_code);
    form.append("memo", items.memo);
    return form;
  });

  const handleFormData = (event) => {
    if (event instanceof FormData) {
      for (let [key, value] of event.entries()) {
        formData.set(key, value);
      }

      if (event.has("picture")) {
        const file = event.get("picture");
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
      }
    } else if (event?.target) {
      const { name, value } = event.target;
      console.log(`Setting ${name} to:`, value);
      formData.set(name, value);

      const newFormData = new FormData();
      formData.forEach((val, key) => {
        newFormData.set(key, val);
      });

      setFormData(newFormData);
    } else {
      console.log("Unexpected event structure:", event);
    }
    return formData;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(items);

    try {
      await axiosInstance
        .put(`/category/${items.product_category_id}`, formData)
        .then((res) => {
          console.log(res);
          dispatch(getCategorys());
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DialogContent>
      <form onSubmit={handleFormSubmit}>
        <DialogHeader className='mb-3'>
          <DialogTitle>Product Category Details Information</DialogTitle>
        </DialogHeader>
        <Separator />
        <div className='flex justify-between mb-2 mt-2'>
          <FormInput
            onCallbackInput={handleFormData}
            name='category_name'
            value={formData.get("category_name") || ""}
            label='Product Category Name'
          />
          <FormInput
            onCallbackInput={handleFormData}
            name='category_code'
            value={formData.get("category_code")}
            label='Product Category Code'
            readonly={true}
          />
        </div>
        <FormTextArea
          onCallbackInput={handleFormData}
          label='Description'
          name='memo'
          value={formData.get("memo")}
        />
        <div className='flex justify-between my-3'>
          <div className='flex flex-col gap-2'>
            <Label>Choose Image*</Label>
            <FormImageResize
              onCallbackFormData={handleFormData}
              resolution={600}
            />
          </div>
          <FormImagePreview imgSrc={imagePreview} />
        </div>
        <DialogClose className='mt-2'>
          <Button type='submit'>Submit</Button>
        </DialogClose>
      </form>
    </DialogContent>
  );
};

ProductCategoryUpdate.propTypes = {
  items: PropTypes.object,
};

export default ProductCategoryUpdate;
