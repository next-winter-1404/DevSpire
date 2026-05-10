
interface IGetHouses{
  transactionType: string
  propertyType: string
}

export async function GetHouses({transactionType, propertyType} : IGetHouses) {
  try {
    const response = await fetch(`http://next.genzuni.website/api/houses?transactionType=${transactionType}&${propertyType}`);
    
    if (!response.ok) {
      throw new Error('خطا در دریافت اطلاعات خانه‌ها');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('مشکلی پیش اومد:', error);
    return null;
  }
}
