"use server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/server/auth";
import { revalidateSite } from "@/server/revalidate";
import { toErrorResult, type MutationResult } from "./types";
import { intInRange, required } from "@/server/validation";
export interface ServiceTimeInput { label: string; time: string; order: number; }
function validateServiceTime(data: ServiceTimeInput): ServiceTimeInput {
  return { label: required(data.label, "Label", 200), time: required(data.time, "Time", 100), order: intInRange(data.order, 0, 100000, "Order") };
}
export async function createServiceTime(data: ServiceTimeInput): Promise<MutationResult> { try { await requireAdmin(); data = validateServiceTime(data); await prisma.serviceTime.create({ data }); revalidateSite();
    return { success: true }; } catch (error) { return toErrorResult(error, "Could not save service time."); } }
export async function updateServiceTime(id: string, data: ServiceTimeInput): Promise<MutationResult> { try { await requireAdmin(); data = validateServiceTime(data); await prisma.serviceTime.update({ where: { id }, data }); revalidateSite();
    return { success: true }; } catch (error) { return toErrorResult(error, "Could not save service time."); } }
export async function deleteServiceTime(id: string): Promise<MutationResult> { try { await requireAdmin(); await prisma.serviceTime.delete({ where: { id } }); revalidateSite();
    return { success: true }; } catch (error) { return toErrorResult(error, "Could not delete service time."); }
}
