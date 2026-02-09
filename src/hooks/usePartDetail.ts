import { useState, useEffect } from 'react';
import { getPartDetail, Part } from '@/apis/part';

/**
 * 특정 부품의 상세 정보를 가져오는 커스텀 훅
 */
export function usePartDetail(modelId: string | null, partId: string | null) {
  const [partDetail, setPartDetail] = useState<Part | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!modelId || !partId) {
      setPartDetail(null);
      return;
    }

    const fetchPartDetail = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getPartDetail(modelId, partId);
        // API 응답 구조상 items 배열의 첫 번째 요소가 상세 정보임
        if (response.items && response.items.length > 0) {
          setPartDetail(response.items[0]);
        } else {
          setPartDetail(null);
        }
      } catch (err) {
        console.error('Failed to fetch part detail:', err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setPartDetail(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPartDetail();
  }, [modelId, partId]);

  return { partDetail, isLoading, error };
}
