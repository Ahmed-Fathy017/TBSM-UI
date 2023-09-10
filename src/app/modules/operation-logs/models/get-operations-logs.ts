export class GetOperationLogs {
    date_from: string = "";
    date_to: string = "";
    // type?: string = "add=إضافة||edit=تعديل||delete=حذف||export=استخراج||import=تصدير||supply_request = طلب إمداد||product_withdrawal = سحب منتج||accept=الموافقه على طلب الإمداد||refuse=رفض طلب الإمداد||add_products=إضافة منتجات||change_status=تغيير حالة العميل"
    type: string | null = null;
    is_export: boolean = false;
}