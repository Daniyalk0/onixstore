import { Client, Databases, ID, Query, Storage } from "appwrite";
import conf from "../conf";

export class ConfigService {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.storage = new Storage(this.client);
    this.databases = new Databases(this.client);
  }

  async addProductToDatabase({
    productName,
    productPrice,
    productImage,
    productRating,
    userId,
    productQuantity,
    productId,
    productSize, 
    productColor,
  }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        ID.unique(),
        {
          productName,
          productPrice,
          productImage,
          productRating,
          userId,
          productQuantity,
          productId,
          productColor,
          productSize
        }
      );
    } catch (error) {
      console.log("Appwrite serive :: createPost :: error", error);
      return false;
    }
  }

  async updateProductQuantity({
    documentId, // Renamed for clarity
    productQuantity,
  }) {
    try {
      // Fetch the existing product by its document ID
      const existingProduct = await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        documentId // Use documentId instead of slug
      );

      if (existingProduct) {
        // Update the productQuantity by adding the new quantity
        const updatedQuantity =
          existingProduct.productQuantity + productQuantity;

        // Update the document with the new productQuantity
        return await this.databases.updateDocument(
          conf.appwriteDatabaseId,
          conf.appwriteCollectionId,
          documentId, // Use documentId here as well
          {
            productQuantity: updatedQuantity,
          }
        );
      } else {
        console.log("Product not found, cannot update quantity");
        return false;
      }
    } catch (error) {
      console.log("Appwrite service :: updateProductQuantity :: error", error);
      console.log(documentId); // Log the documentId to debug
      return false;
    }
  }

  async decreaseProductQuantity(slug) {
    try {
      // Fetch the existing product by its slug (assuming slug is the unique ID)
      const existingProduct = await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );

      if (existingProduct) {
        // Check if the current quantity is greater than 0 before decreasing
        if (existingProduct.productQuantity > 0) {
          const updatedQuantity = existingProduct.productQuantity - 1;

          // Update the document with the new productQuantity
          return await this.databases.updateDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug, // using the slug as the document ID
            {
              productQuantity: updatedQuantity,
            }
          );
        } else {
          console.log("Product quantity is already zero, cannot decrease");
          return false; // Optionally, handle the case where quantity is 0
        }
      } else {
        console.log("Product not found, cannot decrease quantity");
        return false;
      }
    } catch (error) {
      console.log(
        "Appwrite service :: decreaseProductQuantity :: error",
        error
      );
      return false;
    }
  }

  async getProducts(userId) {
    try {
      const response = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        [Query.equal("userId", userId)]
      );
      return response.documents;
    } catch (error) {
      console.log("Appwrite service :: getProducts :: error", error);
    }
  }

  async deleteProduct(productId) {
    try {
      const response = await this.databases.deleteDocument(
        conf.appwriteDatabaseId, // Your database ID
        conf.appwriteCollectionId, // Your collection ID
        productId // The ID of the product to delete
      );

      console.log("Product deleted successfully:", response);
      return response; // Return the response, in case you want to handle it
    } catch (error) {
      console.error("Appwrite service :: deleteProduct :: error", error);
    }
  }

  async checkIfProductExists(productId) {
    try {
      const response = await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        productId
      );

      // If the product exists, the documents array will not be empty
      if (response.documents) {
        console.log("resssss", response);
        return true; // Product exists
      } else {
        console.log("no productssssss");
        return false;
      }
    } catch (error) {
      console.error("Appwrite service :: checkIfProductExists :: error", error);
      return false; // In case of error, return false
    }
  }

  async uploadFile(fileUrl) {
    try {
      // Fetch the image from the URL
      const response = await fetch(fileUrl);
  
      // Check if the response is OK
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // Convert the response to a Blob
      const blob = await response.blob();
  
      // Convert the blob (regardless of its format) to JPEG using a canvas
      const imageBitmap = await createImageBitmap(blob); // Create ImageBitmap from Blob
  
      // Create a canvas to draw the image on
      const canvas = document.createElement('canvas');
      canvas.width = imageBitmap.width;
      canvas.height = imageBitmap.height;
  
      const context = canvas.getContext('2d');
      context.drawImage(imageBitmap, 0, 0);
  
      // Convert the canvas content to a JPEG blob
      const jpegBlob = await new Promise((resolve) => {
        canvas.toBlob(resolve, 'image/jpeg', 1.0); // 1.0 = full quality
      });
  
      // Create a File object from the JPEG Blob
      const jpegFile = new File([jpegBlob], "uploadedImage.jpg", { type: "image/jpeg" });
  
      // Create a unique ID for the file
      const fileId = ID.unique();
  
      // Upload the JPEG File to Appwrite
      const uploadResponse = await this.storage.createFile(
        conf.appwriteBucketId, // Your bucket ID
        fileId, // Unique file ID
        jpegFile // The File object to upload
      );
  
      console.log("File uploaded successfully:", uploadResponse);
      return uploadResponse;
  
    } catch (error) {
      console.error("Appwrite service :: uploadFileFromUrl :: error", error);
    }
  }
  
  

  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deleteFile :: error", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    try {
      return this.storage.getFilePreview(conf.appwriteBucketId, fileId);
    } catch (error) {
      console.log("Appwrite serive :: previewFile :: error", error);
    }
  }
}

const configService = new ConfigService();
export default configService;
