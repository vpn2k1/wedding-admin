import { NextResponse } from 'next/server';
import type { VietQrBank } from '@/lib/supabase/types';

export const revalidate = 86400;

const fallbackBanks: VietQrBank[] = [
  { bin: '970436', code: 'VCB', shortName: 'Vietcombank', name: 'Ngân hàng TMCP Ngoại thương Việt Nam' },
  { bin: '970407', code: 'TCB', shortName: 'Techcombank', name: 'Ngân hàng TMCP Kỹ thương Việt Nam' },
  { bin: '970415', code: 'ICB', shortName: 'VietinBank', name: 'Ngân hàng TMCP Công thương Việt Nam' },
  { bin: '970418', code: 'BIDV', shortName: 'BIDV', name: 'Ngân hàng TMCP Đầu tư và Phát triển Việt Nam' },
];

type VietQrBankPayload = Omit<VietQrBank, 'bin'> & { bin: string | number; transferSupported?: number };

export async function GET() {
  try {
    const response = await fetch('https://api.vietqr.io/v2/banks', { next: { revalidate: 86400 } });
    const payload = (await response.json()) as { data?: VietQrBankPayload[] };

    if (!response.ok || !payload.data?.length) throw new Error('Không thể tải danh sách ngân hàng VietQR.');

    const banks = payload.data
      .filter((bank) => bank.bin && bank.shortName && bank.transferSupported !== 0)
      .map(({ bin, code, shortName, name }) => ({ bin: String(bin), code, shortName, name }))
      .sort((a, b) => a.shortName.localeCompare(b.shortName, 'vi'));

    return NextResponse.json({ banks });
  } catch {
    // ponytail: four common banks keep QR creation usable while VietQR is unavailable.
    return NextResponse.json({ banks: fallbackBanks, warning: 'Đang dùng danh sách ngân hàng dự phòng.' });
  }
}
